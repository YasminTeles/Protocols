const grpc = require('@grpc/grpc-js')
var protoLoader = require("@grpc/proto-loader")

const PROTO_PATH = "./notes.proto"

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
}

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options)
const notesProto = grpc.loadPackageDefinition(packageDefinition)

const server = new grpc.Server();

let notes = [
    { id: '1', title: 'Note 1', content: 'Content 1' },
    { id: '2', title: 'Note 2', content: 'Content 2' }
]


server.addService(notesProto.NoteService.service, {
    list: (_, callback) => {
        callback(null, { notes })
    },
    get: (_, callback) => {
        const noteId = _.request.id
        const note = notes.find(({ id }) => noteId == id)
        callback(null, note);
    },
    add: (call, callback) => {
        const note = { id: Date.now(), ...call.request }
        notes.push(note)
        callback(null, note)
    },
    edit: (_, callback) => {
        const noteId = _.request.id
        const note = notes.find(({ id }) => noteId == id)
        note.content = _.request.content
        note.title = _.request.title
        callback(null, note)
    },
    delete: (_, callback) => {
        const noteId = _.request.id
        notes = notes.filter(({ id }) => id !== noteId)
        callback(null, {});
    },
})

server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        console.log("Server running at http://127.0.0.1:50051")
        server.start()
    }
)
