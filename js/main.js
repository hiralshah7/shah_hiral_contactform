import { SendMail } from "./components/mailer.js";

(() => {
    const { createApp } = Vue

    createApp({
        data() {
            return {
                erroFirstname: false,
                erroLastname: false,
                erroEmail: false,
                erroMassage: false,
                sucessMassage: false,

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
                    this.erroFirstname = false;
                } else {
                    this.$refs.fname.classList.add("error");
                    this.erroFirstname = true;
                }

                if (this.form.lastname.length > 0) {
                    this.$refs.lname.classList.remove("error");
                    this.erroLastname = false;
                } else {
                    this.$refs.lname.classList.add("error");
                    this.erroLastname = true;
                }

                if (this.form.email.length > 0) {
                    this.$refs.email.classList.remove("error");
                    this.erroEmail = false;
                } else {
                    this.$refs.email.classList.add("error");
                    this.erroEmail = true;
                }

                if (this.form.text.length > 0) {
                    this.$refs.message.classList.remove("error");
                    this.erroMassage = false;
                } else {
                    this.$refs.message.classList.add("error");
                    this.erroMassage = true;
                }

            },

            processMailSuccess(result) {
                this.sucessMassage = true;
                this.$refs.fname.classList.remove("error");
                this.$refs.lname.classList.remove("error");
                this.$refs.email.classList.remove("error");
                this.$refs.message.classList.remove("error");
                this.erroFirstname = false;
                this.erroLastname = false;
                this.erroEmail = false;
                this.erroMassage = false;
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