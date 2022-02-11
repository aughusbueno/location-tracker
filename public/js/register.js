class Register{

    constructor(){
        this.endpoint = {
            register : "/user/register"
        }
        this.email = document.querySelector('#email')
        this.password = document.querySelector('#password')
        this.name = document.querySelector('#name')
        this.vehicle = document.querySelector('#vehicle')
        this.plate = document.querySelector('#plate')
        this.form = document.querySelector('form')
    }

    HandleValidation ()
    {
        if(this.email.value.trim() === "") 
            return {valid:false, message:"Please fill up the email."}

        if(this.name.value.trim() === "") 
            return {valid:false, message:"Please fill up the name."}

        if(this.plate.value.trim() === "") 
            return {valid:false, message:"Please fill up the plate."}

        if(this.password.value.trim() === "") 
            return {valid:false, message:"Please fill up the password."}

        return {valid:true}
    }

    async Submit ()
    {   
        const validate = this.HandleValidation()

        if(!validate.valid) return alert(validate.message)

        fetch(this.endpoint.register,{
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                email : this.email.value,
                password : this.password.value,
                name : this.name.value,
                plate : this.plate.value,
                vehicle : this.vehicle.value
            })
        })
        .then(res => res.json())
        .then(d => {
            console.log(d)
            if(d.status === true){
                alert("registered!")
                document.querySelector('form').reset()
            }
            else{
                alert(d.error)
            }
        })
        .catch(err => console.log(err))
    }

    _init ()
    {
        this.form.addEventListener('submit', (e) =>{
            e.preventDefault()

            this.Submit()
        })
    }
}

(new Register)._init()