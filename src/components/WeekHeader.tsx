import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/colors'

export default function WeekHeader(){
    const weekDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  return (
    <View style={styles.container}>
        {weekDays.map(day=>(
            <Text style={styles.day}>
                {day}
            </Text>
        ))}
    </View>
  )
}


const styles = StyleSheet.create({
    container :{
        flexDirection : "row",
          marginTop: 10,
          marginBottom: 8,
    },
    day :{
          flex: 1,
    textAlign: 'center',
    color: COLORS.weekDay,
    fontWeight: '600',
    fontSize: 14,
    }
})