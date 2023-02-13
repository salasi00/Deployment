package citydto

import (
	"time"
)

type CreateCityRequest struct {
	Name      string    `json:"name" form:"name" validate:"required"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type UpdateCityRequest struct {
	Name      string    `json:"name" form:"name" validate:"required"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
