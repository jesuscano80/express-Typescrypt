import app from "./app"
import database from "./database/database"

database
.then(db=> console.log("connected to "+ db.connection.db.databaseName))
.catch(err=> console.log("error"+ err))

app.listen(app.get("port"),()=> console.log("connected to port" + app.get("port")))
