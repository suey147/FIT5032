<template>
    <h1 class="text-center">Add Book</h1>
    <form @submit.prevent="addBook">
        <div class="row mb-3">
            <div class="col-md-12 col-sm-12 col-12">
                <label for="isbn" class="form-label">ISBN:</label>
                <input class="form-control" type="number" placeholder="isbn" v-model="bookData.isbn" required/>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-md-12 col-sm-12 col-12">
                <label for="name" class="form-label">Name:</label>
                <input class="form-control" type="text" placeholder="name" v-model="bookData.name" required/>
            </div>
        </div>
        <p><button class="btn btn-primary me-2" type="submit">Add book</button></p>
    </form>
    <BookList/>
    <UpdateBookView />
</template>

<script setup>
    import {ref} from "vue"
    import db from '../firebase/init.js'
    import { collection, addDoc } from "firebase/firestore";
    import BookList from "./BookList.vue";
    import UpdateBookView from "./UpdateBookView.vue";

    const bookData = ref({
        name: '',
        isbn: '',
    });

    const addBook = async () => {
        try {
            const isbnNumber = Number(bookData.value.isbn);
            if(isNaN(isbnNumber)){
                alert('ISBN must be a valid number');
                return;
            }
            
            await addDoc(collection(db, 'books'), {
                isbn: isbnNumber,
                name: bookData.value.name
            });
            bookData.value.isbn = '';
            bookData.value.name = '';
            alert('Book added successfully!');
        } catch (error) {
            console.log('Error adding book: ', error);
        }
    }

    
</script>