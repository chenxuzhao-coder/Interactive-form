/*
Focus the name field when page load
*/
document.querySelector('#name').focus()

/*
Other-job-role field only appear when other option is selected
*/
const otherJobRole = document.querySelector('#other-job-role')
otherJobRole.style.display = 'none'
const title = document.querySelector('#title')
title.addEventListener('change', e => {
    otherJobRole.style.display = 'none'
    if (e.target.value == 'other')
        otherJobRole.style.display = 'inline'
})

/*
Color field is not valid until the theme is selected
 */
const color = document.querySelector('#color')
color.disabled = true
const design = document.querySelector('#design')
design.addEventListener('change', e => {
    color.disabled = false
    const jsPuns = document.querySelectorAll("[data-theme = 'js puns']")
    const heartJs = document.querySelectorAll("[data-theme = 'heart js']")
    if (e.target.value == 'js puns') {
        for (let i = 0; i < jsPuns.length; i++)
            jsPuns[i].hidden = false
        for (let i = 0; i < heartJs.length; i++)
            heartJs[i].hidden = true
        jsPuns[0].selected = true
    } else if (e.target.value == 'heart js') {
        for (let i = 0; i < heartJs.length; i++)
            heartJs[i].hidden = false
        for (let i = 0; i < jsPuns.length; i++)
            jsPuns[i].hidden = true
        heartJs[0].selected = true
    }
})

/*
Activities that checked will appear a total cost, and activities that have same time will be
inhibited when user check one of them
*/
const activitiesBox = document.querySelector('#activities-box')
const activitiesCost = document.querySelector('#activities-cost')
const activities = document.querySelectorAll("[type = 'checkbox']")
let sum = 0
activitiesBox.addEventListener('change', e => {
    if (e.target.type == 'checkbox') {
        if (e.target.checked) {
            sum += parseInt(e.target.getAttribute('data-cost'))
        } else if (!e.target.checked) {
            sum -= parseInt(e.target.getAttribute('data-cost'))
        }
    }
    activitiesCost.innerHTML = `Total: $${sum}`
    for (let i = 0; i < activities.length; i++) {
        if (e.target.checked && activities[i].getAttribute('data-day-and-time') == e.target.getAttribute('data-day-and-time') && activities[i].name !== e.target.name) {
            activities[i].disabled = true
            activities[i].parentNode.classList.add('disabled')
        }
        if (!e.target.checked && activities[i].getAttribute('data-day-and-time') == e.target.getAttribute('data-day-and-time') && activities[i].name !== e.target.name) {
            activities[i].disabled = false
            activities[i].parentNode.classList.remove('disabled')
        }
    }
})

/*
Payment method determine the payment page, the credit card is the default way
*/
document.querySelector("[value = 'credit-card']").selected = true
const paymentMethods = document.querySelector('.payment-methods')
const creditCard = document.querySelector('.credit-card')
const paypal = document.querySelector('.paypal')
const bitcoin = document.querySelector('.bitcoin')
paypal.style.display = 'none'
bitcoin.style.display = 'none'
paymentMethods.addEventListener('change', e => {
    if (e.target.id == 'payment') {
        creditCard.style.display = 'none'
        paypal.style.display = 'none'
        bitcoin.style.display = 'none'
        if (e.target.value == 'credit-card')
            creditCard.style.display = 'block'
        if (e.target.value == 'paypal')
            paypal.style.display = 'block'
        if (e.target.value == 'bitcoin')
            bitcoin.style.display = 'block'
    }
})

/*
Name validate help function
*/
const name = document.querySelector('#name')
const nameValidate = () => {
    const Name = name.value
    console.log(`Name input is: ${Name}`)
    const nameIsValid = /^.+$/.test(Name)
    return nameIsValid
}

/*
Email validate help function
*/
const email = document.querySelector('#email')
const emailValidate = () => {
    const Email = email.value
    const emailIsValid = /^[^@]+@[^@.]+\.com$/i.test(Email)
    console.log(`Email input is: ${Email}`)
    console.log(`emailIsValid: ${emailIsValid}`)
    return emailIsValid
}

/*
Activities validate help function
*/
const activitiesValidate = () => {
    console.log(`Total cost: ${sum}`)
    return sum > 0
}

const payment = document.querySelector('#payment')
const ccNum = document.querySelector('#cc-num')
const zip = document.querySelector('#zip')
const Cvv = document.querySelector('#cvv')

/*
Credit card number validate help function
*/
const ccNumValidate = () => {
    const cardNumber = ccNum.value
    console.log(`cardNumber: ${cardNumber}`)
    const ccNumIsValid = /^\d{13,16}$/.test(cardNumber)
    return ccNumIsValid
}

/*
Zipcode validate help function
*/
const zipCodeValidate = () => {
    const zipCode = zip.value
    console.log(`zipCode: ${zipCode}`)
    const zipCodeIsValid = /^\d{5}$/.test(zipCode)
    return zipCodeIsValid
}

/*
Cvv validate help function
*/
const cvvValidate = () => {
    const cvv = Cvv.value
    console.log(`cvv: ${cvv}`)
    const cvvIsValid = /^\d{3}$/.test(cvv)
    return cvvIsValid
}

/*
Payment validate help function, includes credit card, zipcode, cvv
*/
const paymentValidate = (paymethod) => {
    console.log(paymethod.value)
    let determine = 0
    if (paymethod.value == 'credit-card') {
        if (!ccNumValidate()) {
            validFail(ccNum)
        } else {
            validSuccess(ccNum)
            determine += 1
        }

        if (!zipCodeValidate()) {
            validFail(zip)
        } else {
            validSuccess(zip)
            determine += 1
        }

        if (!cvvValidate()) {
            validFail(Cvv)
        } else {
            validSuccess(Cvv)
            determine += 1
        }

        console.log(determine)
        if (determine == 3) {
            return true
        }

    } else if (paymethod.value == 'paypal') {
        return true
    }
    else if (paymethod.value == 'bitcoin') {
        return true
    }
}

/*
Submit listener, the page will fresh when all fields pass the validate process
*/
const form = document.querySelector('form')
form.addEventListener('submit', e => {
    // e.preventDefault()

    if (!nameValidate()) {
        console.log('name field goes wrong')
        validFail(name)
        e.preventDefault()
    } else {
        validSuccess(name)
    }

    /**
    Email field provide two extra different error messages when two different situations happen
    */
    if (!emailValidate()) {
        console.log('eamil field goes wrong')
        validFail(email)
        e.preventDefault()
    }
    if (emailValidate2()) {
        console.log('eamil field goes wrong')
        validFail2(email)
        e.preventDefault()
    }
    if (emailValidate3()) {
        console.log('eamil field goes wrong')
        validFail3(email)
        e.preventDefault()
    }
    if (emailValidate())
        validSuccess(email)

    if (!activitiesValidate()) {
        console.log('activities field goes wrong')
        validFail(activitiesBox)
        e.preventDefault()
    } else {
        validSuccess(activitiesBox)
    }

    if (!paymentValidate(payment)) {
        console.log('payment field goes wrong')
        e.preventDefault()
    }

})

/*
Name, credit card number, zipcode, cvv will provide messages when user type
*/
name.addEventListener('keyup', e => {
    if (!nameValidate()) {
        validFail(name)
    } else {
        validSuccess(name)
    }
})

ccNum.addEventListener('keyup', e => {
    if (!ccNumValidate()) {
        validFail(ccNum)
    } else {
        validSuccess(ccNum)
    }
})
zip.addEventListener('keyup', e => {
    if (!zipCodeValidate()) {
        validFail(zip)
    } else {
        validSuccess(zip)
    }
})
Cvv.addEventListener('keyup', e => {
    if (!cvvValidate()) {
        validFail(Cvv)
    } else {
        validSuccess(Cvv)
    }
})

/*
The activities field can be selected by tapping
*/
const checkboxCollection = document.querySelectorAll("[type='checkbox']")
checkboxCollection.forEach(checkbox => {
    checkbox.addEventListener('focus', e => {
        checkbox.parentNode.classList.add('focus')
    })
    checkbox.addEventListener('blur', e => {
        document.querySelector('.focus').classList.remove('focus')
    })
})

/*
Two valid help function to determine whether error message appear or not
*/
const validSuccess = (element) => {
    element.parentNode.classList.add('valid')
    element.parentNode.classList.remove('not-valid')
    element.parentNode.lastElementChild.style.display = 'none'
}

const validFail = (element) => {
    element.parentNode.classList.add('not-valid')
    element.parentNode.classList.remove('valid')
    element.parentNode.lastElementChild.style.display = 'block'
}

/*
In terms of the email field, there are two extra valid function to provide two messages in two situation
*/
const emailValidate2 = () => {
    const Email = email.value
    const emailIsValid = /^@[^@.]+\.com$/i.test(Email)
    console.log(emailIsValid)
    return emailIsValid
}
const emailValidate3 = () => {
    const Email = email.value
    const emailIsValid = /^[^@]+@[^@.]+\.[^com]{3}$/i.test(Email)
    console.log(emailIsValid)
    return emailIsValid
}

const validFail2 = (element) => {
    element.parentNode.classList.add('not-valid')
    element.parentNode.classList.remove('valid')
    element.parentNode.lastElementChild.innerHTML = 'you need add something before @'
    element.parentNode.lastElementChild.style.display = 'block'
}

const validFail3 = (element) => {
    element.parentNode.classList.add('not-valid')
    element.parentNode.classList.remove('valid')
    element.parentNode.lastElementChild.innerHTML = "you need only use '.com' at the end"
    element.parentNode.lastElementChild.style.display = 'block'
}