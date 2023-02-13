package housedto

import (
	"housy/models"
	"time"

	"gorm.io/datatypes"
)

type HouseResponse struct {
	ID          int            `json:"id"`
	UserID      int            `json:"-"`
	User        models.User    `json:"user"`
	CityID      int            `json:"-"`
	City        models.City    `json:"city"`
	Name        string         `json:"name" form:"name"`
	Amenities   datatypes.JSON `json:"amenities" form:"amenities"`
	Price       string         `json:"price" form:"price"`
	Rent        string         `json:"rent" form:"rent"`
	Bedroom     string         `json:"bedroom" form:"bedroom"`
	Bathroom    string         `json:"bathroom" form:"bathroom"`
	Sqf         string         `json:"sqf" form:"sqf"`
	Description string         `json:"description" form:"description"`
	Address     string         `json:"address" form:"address"`
	Image       string         `json:"image" form:"image"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
}
