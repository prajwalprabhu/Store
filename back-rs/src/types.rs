use rocket::serde::{Deserialize, Serialize};
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Item {
    pub name: String,
    pub quantity: i64,
    pub unit: String,
    pub mrp: i64,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct DataItem {
    pub shop_name: String,
    pub items: Vec<Item>,
}
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct RmPostRequest {
    pub id: usize,
}
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct EditPostRequest {
    pub id: usize,
    pub data: Item,
}
