const googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider()

  firebase.auth().signInWithPopup(provider)
    .then(res => {
      const { user } = res
      document.getElementById('user').innerHTML = `Hello ${user.displayName}`
    })
    .catch(console.error)
}

const unpdatePost = target => {
  const title = target.value
  const db = firebase.firestore()
  const post = db.collection('posts').doc('firstpost')

  post.update({ title })
}

const uploadFile = files => {
  const image = document.getElementById('image')
  const name = files[0].name
  const file = files.item(0)

  const storageRef = firebase.storage().ref()
  const task = storageRef.child('images/' + name).put(file)

  task.then(()  => {
    console.log(task)
    task.snapshot.ref.getDownloadURL()
      .then(url => {
        image.src = url
      })
  }).catch(console.error)
}

document.addEventListener('DOMContentLoaded', () => {
  const view = document.getElementById('view')
  const productsHtml= document.getElementById('products')
  const app = firebase.app()
  const db = firebase.firestore()

  const post = db.collection('posts').doc('firstpost')
  const productsRef = db.collection('prodacts')

  post.onSnapshot(doc => {
    const data = doc.data()
    view.innerHTML = `${data.title} <br/> ${data.createdAt}`
  })

  const query = productsRef.where('price', '>', 3).orderBy('price', 'desc')

  query.get()
    .then(products => {
      products.forEach(doc => {
        const data = doc.data()
        productsHtml.append(`<div>${data.name} at ${data.price}</div>`)
      })
      // const data = docs.data()
    })

})