import axios from 'axios'
const submitRequest = async (userMessage: string) => {
    let data = {}
    try {
        data = await axios.post('/api/AIChat', {
            message: userMessage,
        })

        console.log(data)
    } catch (err) {
        console.error(err)
    }

    return data.data.data.choices[0].message.content
}

export default submitRequest
