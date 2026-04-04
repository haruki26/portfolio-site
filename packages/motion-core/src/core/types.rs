use thiserror::Error;

#[derive(Error, Debug)]
pub enum InitializeError {
    #[error("The array length must be {0}.")]
    InvalidArrayLength(usize),
}

pub struct State {
    pub velocity: f32,
    pub angle: f32,
    pub filtered_input: f32,
}

const STATE_FIELDS: usize = 3;

impl TryFrom<&[f32]> for State {
    type Error = InitializeError;

    fn try_from(value: &[f32]) -> Result<Self, Self::Error> {
        if value.len() == STATE_FIELDS {
            Ok(Self { velocity: value[0], angle: value[1], filtered_input: value[2] })
        } else {
            Err(InitializeError::InvalidArrayLength(STATE_FIELDS))
        }
    }
}

pub struct Parameter {
    pub deadzone: f32,
    pub input_scale: f32,
    pub alpha: f32,
    pub factor: f32,
    pub gain: f32,
    pub dt: f32,
    pub damping: f32,
    pub max_speed: f32,
}

const PARAMETER_FIELDS: usize = 8;

impl TryFrom<&[f32]> for Parameter {
    type Error = InitializeError;

    fn try_from(value: &[f32]) -> Result<Self, Self::Error> {
        if value.len() == PARAMETER_FIELDS {
            Ok(Self {
                deadzone: value[0],
                input_scale: value[1],
                alpha: value[2],
                factor: value[3],
                gain: value[4],
                dt: value[5],
                damping: value[6],
                max_speed: value[7],
            })
        } else {
            Err(InitializeError::InvalidArrayLength(PARAMETER_FIELDS))
        }
    }
}
