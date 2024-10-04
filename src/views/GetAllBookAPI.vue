<template>
    <pre>{{ jsondata }}</pre>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                jsondata: null,
                error: null,
            };
        },
        mounted(){
            this.getBookCountAPI();
        },
        methods: {
            async getBookCountAPI() {
                try {
                    const response = await axios.get('http://127.0.0.1:5001/vue-firebase-auth-w7/us-central1/getAllBooks');
                    this.jsondata = response.data;
                    this.error = null;
                    
                } catch (error) {
                    console.error('Error fetching book count: ', error);
                    this.error = error;
                    this.count = null;
                }
            },
        },
    };
</script>