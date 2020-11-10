export const converFormToFormData = (form) => {
    let formData = new FormData()
    for (let key of Object.keys(form)) {
        if (typeof form[key] === 'object') {
            if (form[key].length > 1) {
                form[key].map((item) => {
                    formData.append(key, item, item.name)
                })
            } else {
                formData.append(key, form[key], form[key].name)
            }

        } else {
            formData.append(key, form[key])
        }
    }

    return formData

}
