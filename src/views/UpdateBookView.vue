<template>
    <form @submit.prevent="deleteBook">
        <div class="row mb-3">
            <label for="isbn" class="form-label">Delete Book</label>
            <div class="col-md-8 col-sm-8 col-8">
                <input class="form-control" type="number" placeholder="isbn" v-model="deleteBookISBN" required/>
            </div>
            <div class="col-md-4 col-sm-4 col-4">
                <p><button class="btn btn-primary me-2" type="submit">Delete Books</button></p>
            </div>
        </div>
    </form>

    <form @submit.prevent="updateBook">
        <div class="row mb-3">
            <label for="isbn" class="form-label">Update Book</label>

            <div class="col-md-4 col-sm-4 col-4">
                <input class="form-control" type="number" placeholder="isbn" v-model="bookData.isbn" required/>
            </div>
            <div class="col-md-4 col-sm-4 col-4">
                <input class="form-control" type="text" placeholder="name" v-model="bookData.name" required/>
            </div>
            <div class="col-md-4 col-sm-4 col-4">
                <p><button class="btn btn-primary me-2" type="submit">Update Books</button></p>
            </div>
        </div>
    </form>
</template>

<script setup>
    import {ref} from "vue"
    import db from '../firebase/init.js'
    import BookList from "./BookList.vue";
    import { collection, query, where, getDocs, deleteDoc, doc, updateDoc, limit, orderBy } from 'firebase/firestore';

    const bookData = ref({
        name: '',
        isbn: '',
    });

    const deleteBookISBN = ref([]);

    const deleteBook = async () => {
        try {
            const isbnNumber = Number(deleteBookISBN.value);
            console.log(isbnNumber)
            if(isNaN(isbnNumber)){
                alert('ISBN must be a valid number');
                return;
            }
            const q = query(collection(db, 'books'), where('isbn', '==', isbnNumber));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach(async (data) => {
                await deleteDoc(doc(db, 'books', data.id));
            });
            alert(`Book ISBN:${isbnNumber} deleted successfully!`);
        } catch (error) {
            console.log('Error adding book: ', error);
        }
    }

    const updateBook = async () => {
        try {
            const isbnNumber = Number(bookData.value.isbn);
            if(isNaN(isbnNumber)){
                alert('ISBN must be a valid number');
                return;
            }
            const q = query(collection(db, 'books'), where('isbn', '==', isbnNumber), limit(1));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach(async (data) => {
                await updateDoc(doc(db, 'books', data.id), {
                    name: bookData.value.name
                });
            });
            alert(`Book ISBN:${isbnNumber} update successfully!`);
        } catch (error) {
            console.log('Error adding book: ', error);
        }
    }

    
</script>