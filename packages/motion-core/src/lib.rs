use wasm_bindgen::prelude::*;

pub mod core;

// #[wasm_bindgen]
// pub fn update(state: &[f32], input: f32, dt: f32) -> Vec<f32> {
//     // Param
//     let base_gain = 2.5;
//     let damping = 0.92;
//     let max_speed = 10.0;
//
//     let angle = state[0];
//     let velocity = state[1];
//
//     vec![]
// }

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}
