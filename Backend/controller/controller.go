package controller

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/harshau007/go-api/models"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)


const dbName= "backend"
const colName = "Jobs"

var collection *mongo.Collection

func init() {
	err := godotenv.Load()

	if err!=nil{
		log.Fatal("Error occured while loading env")
	}

	var connectionString string = os.Getenv("MONGODB_URL")
	
	clientOption := options.Client().ApplyURI(connectionString)

	client, err := mongo.Connect(context.TODO(), clientOption)
	if err!=nil{
		log.Fatal(err)
	}

	fmt.Println("Connected to DB successfully")

	collection = client.Database(dbName).Collection(colName)

	fmt.Println("Collection ready")
}

func insertUser(user models.User) {
	inserted, err := collection.InsertOne(context.Background(), user)
	if err!=nil{
		log.Fatal("Error occured while inserting user")
	}

	fmt.Println("Inserted user: ", inserted.InsertedID)
}

func updateUser(userID string, updatedUser models.User) error {
	id, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		log.Fatal(err)
	}
	filter := bson.M{"_id": id}
	update := bson.M{"$set": bson.M{
		  "first": updatedUser.Title, 
		  "last": updatedUser.Desc,
		  "year": updatedUser.Year,
		  "url": updatedUser.Url,
		  "location": updatedUser.Location,
		  "company": updatedUser.Company,
		},
	  }

	_, err = collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
	  return err
	}
  
	return nil
}

func deleteUser(userID string) {
	id, _ := primitive.ObjectIDFromHex(userID)
	filter := bson.M{"_id": id}
	deleteCount, err := collection.DeleteOne(context.Background(), filter)
	if err!=nil {
		log.Fatal("Error occured while deleting user")
	}

	fmt.Println("Deleted users: ", deleteCount)
}

func deleteAllUsers() int64 {
	deleteRes, err := collection.DeleteMany(context.Background(), bson.D{{}})
	if err!=nil{
		log.Fatal("Error occured while deleting all users")
	}
	fmt.Println("Deleted all users: ", deleteRes.DeletedCount)
	return deleteRes.DeletedCount
}

func getAllUsers() []primitive.M {
	cursor, err := collection.Find(context.Background(), bson.D{{}})
	if err!=nil {
		log.Fatal("Error occured while fetching all users")
	}

	var users []primitive.M

	for cursor.Next(context.Background()) {
		var user bson.M
		err := cursor.Decode(&user)
		if err!=nil{
			log.Fatal(err)
		}
		users = append(users, user)
	}

	defer cursor.Close(context.Background())
	return users
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencode")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Allow-Control-Allow-Methods", "POST")

	var user models.User
	_ = json.NewDecoder(r.Body).Decode(&user)
	insertUser(user)
	json.NewEncoder(w).Encode(user)

}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencode")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Allow-Control-Allow-Methods", "PUT")

  // Get user ID from URL param
	userID := chi.URLParam(r, "id")

	// Get updated user from request body
	var updatedUser models.User
	json.NewDecoder(r.Body).Decode(&updatedUser)
	
	err := updateUser(userID, updatedUser)
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}

	json.NewEncoder(w).Encode(updatedUser)
}

func GetAllUser(w http.ResponseWriter,r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	allUsers := getAllUsers()
	json.NewEncoder(w).Encode(allUsers)
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencode")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Allow-Control-Allow-Methods", "DELETE")

	params := chi.URLParam(r, "id")
	deleteUser(params)
	json.NewEncoder(w).Encode(params)
}

func DeleteAllUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencode")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Allow-Control-Allow-Methods", "DELETE")

	count := deleteAllUsers()
	json.NewEncoder(w).Encode(count)
}
