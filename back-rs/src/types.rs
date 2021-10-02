//use serde_derive::{Serialize,Deserialize};
use rocket::serde::{Deserialize, Serialize};
//use std::iter::Iterator;

#[derive(Serialize, Deserialize, Debug)]
pub struct Item {
    pub name: String,
    pub quantity: i64,
    pub unit: String,
    pub mrp: i64,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct DataItem {
    pub shop_name: String,
    pub items: Vec<Item>,
}
//impl Iterator for Item{
//    type Item = super::Item;
//    fn next(&mut self)->Option<Self::Item>{

//    }
//}
