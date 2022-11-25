import { SendMail } from "./components/mailer.js";

(() => {
    const { createApp } = Vue

    createApp({
        data() {
            return {
                errorFirstname: false,
                errorLastname: false,
                errormail: false,
                errormessage: false,
                successmsg: false,

                form: {
                    firstname: "",
                    lastname: "",
                    email: "",
                    text: ""
                }
            }
        },

        methods: {
            processMailFailure(result) {

                if (this.form.firstname.length > 0) {
                    this.$refs.fname.classList.remove("error");
                    this.errorFirstname = false;
                } else {
                    this.$refs.fname.classList.add("error");
                    this.errorFirstname = true;
                }

                if (this.form.lastname.length > 0) {
                    this.$refs.lname.classList.remove("error");
                    this.errorLastname = false;
                } else {
                    this.$refs.lname.classList.add("error");
                    this.errorLastname = true;
                }

                if (this.form.email.length > 0) {
                    this.$refs.email.classList.remove("error");
                    this.errormail = false;
                } else {
                    this.$refs.email.classList.add("error");
                    this.errormail = true;
                }

                if (this.form.text.length > 0) {
                    this.$refs.message.classList.remove("error");
                    this.errormessage = false;
                } else {
                    this.$refs.message.classList.add("error");
                    this.errormessage = true;
                }

            },

            processMailSuccess(result) {
                this.successmsg = true;
                this.$refs.fname.classList.remove("error");
                this.$refs.lname.classList.remove("error");
                this.$refs.email.classList.remove("error");
                this.$refs.message.classList.remove("error");
                this.errorFirstname = false;
                this.errorLastname = false;
                this.errormail = false;
                this.errorMessage = false;
            },

            processMail(event) {
                // use the SendMail component to process mail
                SendMail(this.$el.parentNode)
                    .then(data => this.processMailSuccess(data))
                    .catch(err => this.processMailFailure(err));
            },

        }
    }).mount('#mail-form')
})();