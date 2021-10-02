mod types;
#[macro_use]
extern crate rocket;
use rocket::fairing::{Fairing, Info, Kind};
use rocket::http::Header;
use rocket::serde::json::Json;
use rocket::tokio::fs::{File, OpenOptions};
use rocket::tokio::io::{AsyncReadExt, AsyncWriteExt, BufReader};
use rocket::{Request, Response};
use types::{DataItem, Item};
pub struct CORS;
#[rocket::async_trait]
impl Fairing for CORS {
    fn info(&self) -> Info {
        Info {
            name: "Add CORS headers to responses",
            kind: Kind::Response,
        }
    }
    async fn on_response<'r>(&self, _: &'r Request<'_>, response: &mut Response<'r>) {
        response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
        response.set_header(Header::new(
            "Access-Control-Allow-Methods",
            "POST, GET, PATCH,OPTIONS",
        ));
        response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
        response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
    }
}

async fn get_data() -> Option<DataItem> {
    let file = File::open("./data.json").await;
    if let Ok(f) = file {
        let mut reader = BufReader::new(f);
        let mut data_in_string = String::new();
        reader
            .read_to_string(&mut &mut data_in_string)
            .await
            .expect("Failed to read to Strin in get_data");
        let result: Result<DataItem, _> = serde_json::from_str(&data_in_string);
        if let Ok(json_result) = result {
            Some(json_result)
        } else {
            None
        }
    } else {
        None
    }
}
async fn write_data(data: DataItem) -> i32 {
    if let Ok(mut file) = OpenOptions::new().write(true).open("./data.json").await {
        file.write_all(serde_json::to_string(&data).unwrap().as_bytes())
            .await
            .expect("Failed to write");
        1
    } else {
        0
    }
}
#[get("/")]
async fn index() -> &'static str {
    println!("get");
    "Hello, world!"
}
#[get("/init")]
async fn init() -> String {
    serde_json::to_string(&get_data().await.unwrap()).expect("Failed to string")
}

#[get("/search/<pattern>")]
async fn search(pattern: String) -> String {
    let mut data = get_data().await.unwrap();
    let mut result = Vec::<Item>::new();
    for i in data.items {
        if let Some(_) = i.name.find(&pattern) {
            result.push(i);
        }
    }
    data.items = result;
    serde_json::to_string(&data).unwrap()
}

#[post("/new", format = "application/json", data = "<new_item_json>")]
async fn new_item(new_item_json: Json<Item>) -> String {
    println!("{:?}", new_item_json);

    let mut data = get_data().await.unwrap();
    data.items.push(Item {
        name: new_item_json.name.clone(),
        quantity: new_item_json.quantity,
        unit: new_item_json.unit.clone(),
        mrp: new_item_json.mrp,
    });
    write_data(data).await;
    String::from("Done")
}
#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![index, init, search, new_item])
        .attach(CORS)
}
