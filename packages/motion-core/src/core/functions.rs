use super::types::{Parameter, State};

fn preprocess(
    raw_input: f32,
    deadzone: f32,
    input_scale: f32,
    filtered_input: f32,
    alpha: f32,
    factor: f32,
) -> f32 {
    let input = raw_input.signum() * (raw_input.abs() - deadzone).max(0.0);
    let scaled = input * input_scale;
    (filtered_input + alpha * (scaled - filtered_input)) * factor
}

fn update_velocity(
    prev_velocity: f32,
    input: f32,
    gain: f32,
    dt: f32,
    damping: f32,
    max_speed: f32,
) -> f32 {
    let velocity = prev_velocity * damping + input * gain * dt;
    velocity.clamp(-max_speed, max_speed)
}

fn update_angle(prev_angle: f32, velocity: f32, dt: f32) -> f32 {
    prev_angle + velocity * dt
}

pub fn update_state(state: State, raw_input: f32, params: Parameter) -> State {
    let filtered_input = preprocess(
        raw_input,
        params.deadzone,
        params.input_scale,
        state.filtered_input,
        params.alpha,
        params.factor,
    );
    let velocity = update_velocity(
        state.velocity,
        filtered_input,
        params.gain,
        params.dt,
        params.damping,
        params.max_speed,
    );
    let angle = update_angle(state.angle, velocity, params.dt);

    State { velocity, angle, filtered_input }
}

// pub fn update_states(states: Vec<State>, raw_input: f32, params: Parameter) -> Vec<State> {
//     states.iter().map()
// }
