const client = require('./client')

client.list({}, (error, news) => {
    if (error) throw error
    console.log(news)
})

client.get({ id: 1 }, (error, note) => {
    if (error) throw error
    console.log(note)  
})

client.add({
    title: "Note 3",
    content: "Content 3",
},
(error, note) => {
    if (error) throw error
    console.log("Successfully created a note.")
})

client.edit({
    id: 2,
    title: "Note 2 edited",
    content: "Content 2 edited",
},
(error, note) => {
    if (error) throw error
    console.log("Successfully edited a note.")
})

client.delete({
    id: 2,
},
(error, note) => {
    if (error) throw error
    console.log("Successfully deleted a note.")
})
