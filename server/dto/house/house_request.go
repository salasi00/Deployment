package housedto

import (
	"housy/models"
	"time"

	"gorm.io/datatypes"
)

type CreateHouseRequest struct {
	CityID      int            `json:"cityid" form:"cityid"`
	City        models.City    `json:"city"`
	UserID      int            `json:"userid" form:"userid"`
	User        models.User    `json:"user"`
	Name        string         `json:"name" form:"name" validate:"required"`
	Amenities   datatypes.JSON `json:"amenities" form:"amenities" gorm:"type: JSON" validate:"required"`
	Price       string         `json:"price" form:"price" validate:"required"`
	Rent        string         `json:"rent" form:"rent" validate:"required"`
	Bedroom     string         `json:"bedroom" form:"bedroom" validate:"required"`
	Bathroom    string         `json:"bathroom" form:"bathroom" validate:"required"`
	Sqf         string         `json:"sqf" form:"sqf" validate:"required"`
	Description string         `json:"description" form:"description" validate:"required"`
	Address     string         `json:"address" form:"address" validate:"required"`
	Image       string         `json:"image" form:"image"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
}

type UpdateHouseRequest struct {
	CityID      int            `json:"cityid" form:"cityid"`
	UserID      int            `json:"userid" form:"userid"`
	Name        string         `json:"name" form:"name"`
	Amenities   datatypes.JSON `json:"amenities" form:"amenities" gorm:"type: JSON"`
	Price       string         `json:"price" form:"price"`
	Rent        string         `json:"rent" form:"rent"`
	Bedroom     string         `json:"bedroom" form:"bedroom"`
	Bathroom    string         `json:"bathroom" form:"bathroom"`
	Sqf         string         `json:"sqf" form:"sqf" validate:"required"`
	Description string         `json:"description" form:"description"`
	Address     string         `json:"address" form:"address"`
	Image       string         `json:"image" form:"image"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
}
