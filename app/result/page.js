//handles the results of stripe


//stripe testcard numbers
'use client'

import { useEffect, useState } from "react"
import { useRouter} from 'next/navigation'
import {getStripe} from '@/utils/get-stripe'
import { useSearchParams } from "next/navigation"
import {Box, CircularProgress, Typography, Container } from "@mui/material"



const ResultPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id')

    //check we checkout properly

    //we want to load from beginning
    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)


    useEffect(() => {
        const fetchCheckoutSession = async () => {
            if (!session_id){
                return 
            }
            try{
                const res = await fetch(`/api/checkout_session?session_id=${session_id}`)
                const sessionData = await res.json()
                if (res.ok){
                    setSession(sessionData)
                    
                }else{
                    setError(sessionData.error)
                }
            }
            catch(err){
                console.log(err)
               setError("An error occured")
            }
            finally{
                setLoading(false)
            }
        }
        fetchCheckoutSession()

    },[session_id])

    if (loading){
        return (

            <Container maxWidth = "100vw" sx = {{
                textAlign: "center",
                mt: 4, 


            }}>
                <CircularProgress>
                    <Typography variant="h6">
                        Loading...
                    </Typography>
                </CircularProgress>
            </Container>
        )
    }

    if (error){
        return(
            <Container maxWidth = "100vw" sx = {{
                textAlign: "center",
                mt: 4, 


            }}>
                <Typography variant="h6">
                    {error}
                </Typography>
            </Container>
        )
    }

    //if no error, return actual value

    return (
        <Container maxWidth = "100vw" sx = {{
            textAlign: "center",
            mt: 4, 


        }}>

           {
            session.payment_status === "paid" ? (

                //render typography
                <>
                <Typography variant = "h4">Thank you for Purchasing</Typography>
                <Box sx = {{mt: 22}}>
                    <Typography variant="h6">Session ID: {session_id}</Typography>
                    <Typography variant="body1">We have recieved your payment. You will recieve a reciept in you email.</Typography>
                </Box>
                </>
            ) : (
                <>
                 <Typography variant = "h4">Payment Failed</Typography>
                <Box sx = {{mt: 22}}>
                    
                    <Typography variant="body1">Your payment was not sucessful. Please try again</Typography>
                </Box>
                
                </>
            )} 
        </Container>
    )
}




export default ResultPage