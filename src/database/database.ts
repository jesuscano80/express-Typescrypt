import {connect, set} from "mongoose"
import {config} from "dotenv";

config();
set('strictQuery', false);
export default connect(process.env.MONGODB_URI as string , {ignoreUndefined:false})
