import React, { useEffect, useState } from 'react'

function FormSelectProvince(props) {

    const { label, data, setData } = props;

    const [value, setValue] = useState('')
    const [provinces, setProvinces] = useState([])
    useEffect(() => {
        const DataList = async () => {
            const response = await fetch(`https://provinces.open-api.vn/api/`)
            setProvinces(await response.json())
        };
        DataList(provinces)
    }, [])

    const handelChange = (value) => {
        setValue(value || null)
        console.log('value', value);
    }

    useEffect(() => {
        if (data) {
            setValue(data);
        }
        console.log('data', data);
    }, [data])

    return (
        <div>
            <label>{label} </label>
            <br />
            <select onChange={handelChange}
                value={value}
            >
                {provinces.map(item => (
                    <option value={item.name}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default FormSelectProvince