import React from 'react'
import { Text } from 'react-native'
import ProgressCircle from 'react-native-progress-circle'
import { global } from '../../assets/styles/globalStyles'

const CircleProgressSmal = ({ student }) => {

    const monthly_payment = student.monthly_payment
    const total_year = student.total_year
    const total_paid = student.total_paid


    const renderMonths = () => {
        // calculamos los meses pagados
        const months_pay = Math.floor(total_paid / monthly_payment)

        if (student.coverage) {
            return <Text style={[global.font, { fontSize: 20 }]}>Cob</Text>

        } else if ((months_pay + (10 - student.initial_charge)) === 1) {
            return <Text style={[global.font, { fontSize: 20 }]}>Feb</Text>

        } else if ((months_pay + (10 - student.initial_charge)) === 2) {
            return <Text style={[global.font, { fontSize: 20 }]}>Mar</Text>

        } else if ((months_pay + (10 - student.initial_charge)) === 3) {
            return <Text style={[global.font, { fontSize: 20 }]}>Abr</Text>

        } else if ((months_pay + (10 - student.initial_charge)) === 4) {
            return <Text style={[global.font, { fontSize: 20 }]}>May</Text>

        } else if ((months_pay + (10 - student.initial_charge)) === 5) {
            return <Text style={[global.font, { fontSize: 20 }]}>Jun</Text>

        } else if ((months_pay + (10 - student.initial_charge)) === 6) {
            return <Text style={[global.font, { fontSize: 20 }]}>Jul</Text>

        } else if ((months_pay + (10 - student.initial_charge)) === 7) {
            return <Text style={[global.font, { fontSize: 20 }]}>Agos</Text>

        } else if ((months_pay + (10 - student.initial_charge)) === 8) {
            return <Text style={[global.font, { fontSize: 20 }]}>Sep</Text>

        } else if ((months_pay + (10 - student.initial_charge)) === 9) {
            return <Text style={[global.font, { fontSize: 20 }]}>Oct</Text>

        } else if ((months_pay + (10 - student.initial_charge)) === 10) {
            return <Text style={[global.font, { fontSize: 20 }]}>Nov</Text>
        }
    }

    const changeColor = () => {
        const n = student.monthOwed //cantidad de meses en mora
        const e = student.amountOwed //valor en mora

        if (student.coverage) {
            return "#11cdef"
        }
        else if (n >= 3) {
            return "#f5222d"
        }
        else if (n >= 1 || e !== 0) {
            return "#fab01e"
        }
        else if (n === 0) {
            return "#2dce89"
        }
    }


    const percentage = () => {
        return (total_paid * 100) / total_year
    }

    return (
        <ProgressCircle
            percent={student.coverage ? 100 : percentage()}
            radius={30}
            borderWidth={8}
            color={changeColor()}
            shadowColor="#ececec"
            bgColor="#fff"
        >
            {renderMonths()}
        </ProgressCircle>
    )
}

export default CircleProgressSmal
