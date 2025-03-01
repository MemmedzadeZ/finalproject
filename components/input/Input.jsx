import { TextInput } from 'react-native'

const Input = ({ name, placeholder, value, setdata,className,style }) => {
    return (
        <TextInput placeholderTextColor={"#FFFFFFB2"} secureTextEntry={name === "password" || name === "repeat_password" ? true : false} defaultValue={value} onChangeText={(text) => {
            setdata(prevState => ({ ...prevState, [name]: name === "email" ? text.toLowerCase() : text }))
        }} placeholder={placeholder} className={className} style={style} />
    )
}

export default Input