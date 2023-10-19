package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Title string `json:"title,omitempty"`
	Desc string `json:"desc,omitempty"`
	Year string `json:"year,omitempty"`
	Url string `json:"url,omitempty"`
	Location string `json:"location,omitempty"`
	Company string `json:"company,omitempty"`
}