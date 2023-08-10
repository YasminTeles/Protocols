const grpc = require('@grpc/grpc-js')
var protoLoader = require("@grpc/proto-loader")

const PROTO_PATH = './notes.proto'

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
}

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options)

const NoteService = grpc.loadPackageDefinition(packageDefinition).NoteService

const client = new NoteService(
    'localhost:50051',
    grpc.credentials.createInsecure()
)

module.exports = client
