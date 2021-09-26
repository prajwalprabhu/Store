mod types;
use std::fs::File;
use std::io::BufReader;

use types::{DataItem,Item};

use rocket::http::Header;
use rocket::{Request, Response};
use rocket::fairing::{Fairing, Info, Kind};
//use rocket::serde::json::Json;     
use rocket::serde::json::Json;
pub struct CORS;
#[rocket::async_trait]
impl Fairing for CORS {
    fn info(&self) -> Info {
        Info {
            name: "Add CORS headers to responses",
            kind: Kind::Response
        }
    }

    async fn on_response<'r>(&self, _: &'r Request<'_>, response: &mut Response<'r>) {
        response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
        response.set_header(Header::new("Access-Control-Allow-Methods", "POST, GET, PATCH, OPTIONS"));
        response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
        response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
    }
}




//use types::{Item,DataItem}
fn getData()->Option<DataItem>{
    let file = File::open("./data.json");
    if let Ok(f)=file{
        let reader = BufReader::new(f);
        let result:Result<DataItem,_>= serde_json::from_reader(reader);
        if let Ok(json_result)=result{
            Some(json_result)
        }else{
    None
        }
    }else{
    None}
}
#[macro_use] extern crate rocket;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[get("/init")]
fn init()->String{
    serde_json::to_string(&getData().unwrap()).expect("Failed to string")
}

#[get("/search/<pattern>")]
fn search(pattern:String)->String{
    let mut data = getData().unwrap();
    let mut result = Vec::<Item>::new();
    for i in data.items{
        if let Some(_)=i.name.find(&pattern){
            result.push(i);
        }
    }
    data.items=result;
    serde_json::to_string(&data).unwrap()

}

#[post("/new" , data="<input>")]
fn newItem(input:Json<Item>){
    println!("{:?}",input);
}
#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![index,init,search]).attach(CORS)
    
}

//fn main() {
//   getData(); 
//    println!("Hello, world!");
//}
