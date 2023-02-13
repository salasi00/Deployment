package transactiondto

import (
	"housy/models"
	"time"
)

type HouseResponse struct {
	ID        int          `json:"id"`
	HouseID   int          `json:"-"`
	House     models.House `json:"house"`
	UserID    int          `json:"-"`
	User      models.User  `json:"user"`
	CheckIn   string       `json:"check_in" form:"name"`
	CheckOut  string       `json:"check_out" form:"check_out"`
	Total     string       `json:"total" form:"total"`
	Status    string       `json:"status" form:"status"`
	CreatedAt time.Time    `json:"created_at"`
	UpdatedAt time.Time    `json:"updated_at"`
}
