<template>
    <!-- centre container with top margin of 5 units -->
    <div class="container mt-5">
        <div class="row">
            <!-- a column spans 8 grid spaces centred by offsetting 2 grid -->
            <div class="col-md-8 offset-md-2">
                <h1 class="text-center">User Information Form</h1>
                <!-- prevent defaul submit behaviour -->
                <form @submit.prevent="submitForm">
                    <!-- add bottom margin of 3 units -->
                    <div class="row mb-3">
                        <div class="col-md-6 col-sm-6 col-6">
                            <label for="username" class="form-label">Username</label>
                            <!-- check when unfocuses and input field value changes -->
                            <input type="text" class="form-control" id="username" 
                                @blur="() => validateName(true)" 
                                @input="() => validateName(false)"
                                v-model="formData.username">
                            <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
                        </div>
                        <div class="col-md-6 col-sm-6 col-6">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" 
                                @blur="() => validatePassword(true)" 
                                @input="() => validatePassword(false)"
                                v-model="formData.password">
                            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-md-6 col-sm-6 col-6">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="isAustralian" v-model="formData.isAustralian">
                                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6 col-6">
                            <div class="form-check">
                                <label class="form-label" for="gender">Gender</label>
                                <select class="form-select" id="gender" v-model="formData.gender">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="reason" class="form-label">Reason for joining</label>
                        <textarea class="form-control" id="reason" rows="3" v-model="formData.reason"></textarea>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary me-2">Submit</button>
                        <!-- clear the form -->
                        <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
                    </div>
                </form>
                <!-- a card -->
                <!-- check of any items in submittedCards and return number of elements in the array -->
                <div class="row mt-5" v-if="submittedCards.length">
                    <!-- flexbox container: flexbox layout, child elements wrap to next line if not fit in one row, aligns child elements to start of container -->
                    <div class="d-flex flex-wrap justify-content-start">
                        <!-- iterate over submittedCards: assigns unique key to each card element using index. 18rem: fixed width of 18 rem units -->
                        <div v-for="(card, index) in submittedCards" :key="index" class="card m-2" style="width: 18rem;">
                            <div class="card-header">
                                User Information
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Username: {{ card.username }}</li>
                                <li class="list-group-item">Password: {{ card.password }}</li>
                                <li class="list-group-item">Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}</li>
                                <li class="list-group-item">Gender: {{ card.gender }}</li>
                                <li class="list-group-item">Reason: {{ card.reason }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    const formData = ref({
        username: '',
        password: '',
        isAustralian: false,
        reason: '',
        gender: ''
    });

    const submittedCards = ref([]);

    const submitForm = () => {
        validateName(true);
        validatePassword(true);
        if(!errors.value.username && !errors.value.password){
            submittedCards.value.push({
            ...formData.value
            });
            clearForm();
        }

    };

    const clearForm = () => {
        formData.value.username = '';
        formData.value.password = '';
        formData.value.isAustralian = false;
        formData.value.reason = '';
        formData.value.gender = '';
    }

    const errors = ref({
        username: null,
        password: null,
        resident: null,
        gender: null,
        reason: null
    });
    // blur is boolean that indicates whether the validation was triggered
    const validateName = (blur) => {
        if (formData.value.username.length <3){
            if(blur) errors.value.username = "Name must be at least 3 characters";
        } else {
            errors.value.username = null;
        }
    }

    const validatePassword = (blur) => {
        const password = formData.value.password;
        const minLength = 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength){
            if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`;
        } else if (!hasUppercase) {
            if (blur) errors.value.password = "Password must contain at least one uppercase letter.";
        } else if (!hasLowercase) {
            if (blur) errors.value.password = "Password must contain at least one lowercase letter.";
        } else if (!hasNumber) {
            if (blur) errors.value.password = "Password must contain at least one number.";
        } else if (!hasSpecialChar) {
            if (blur) errors.value.password = "Password must contain at least one special character.";
        } else {
            errors.value.password = null;
        }
    }

    const validateGender = (blur) => {

    }

    const validateReason = (blur) => {
        
    }

    const validateResident = (blur) => {
        
    }
</script>

<style scoped>

    .card {
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .card-header {
    background-color: #275FDA;
    color: white;
    padding: 10px;
    border-radius: 10px 10px 0 0;
    }
    .list-group-item {
    padding: 10px;
    }

    .form-column {
    flex: 1;
    padding: 10px;
    box-sizing: border-box;
    }
    @media (max-width: 576px) {
    .form-column {
    flex: 0 0 100%;
    max-width: 100%;
    }
}

</style>