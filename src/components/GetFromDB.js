import React, { useState } from 'react'
import { useEffect } from 'react';

function GetFromDB({ token, setPersonalDetails, setGoals, goals, setDependent, setAssets, setLiabilities, setRevenue, setExpenses }) {
    const [rawGoal, setRawGoal] = useState([]);
    const [rawAssets, setRawAssets] = useState([]);
    const [rawLiabilities, setRawLiabilities] = useState([]);
    useEffect(() => {
        fetch("http://137.184.16.76:81/api/user/details", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => { setPersonalDetails(data); console.log(data) })
            .catch(error => console.error(error));
        fetch("http://137.184.16.76:81/api/user/goals", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                setRawGoal(data);
            })
            .catch(error => console.error(error));
        fetch("http://137.184.16.76:81/api/user/assets", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                setRawAssets(data);
            })
            .catch(error => console.error(error));

        fetch("http://137.184.16.76:81/api/user/revenues", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                setRevenue(data);
            })
            .catch(error => console.error(error));
            fetch("http://137.184.16.76:81/api/user/liabilities", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setRawLiabilities(data);
                })
                .catch(error => console.error(error));
    
            fetch("http://137.184.16.76:81/api/user/expenses", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(data => {
                    setExpenses(data);
                })
                .catch(error => console.error(error));
            
    }, []);
    useEffect(() => {
        if (rawGoal) {
            const newGoals = Object.keys(rawGoal).map((e) => ({
                amount: rawGoal[e].value,
                goal: rawGoal[e].name,
            }));
            setGoals(newGoals);
        }
    }, [rawGoal]);
    useEffect(() => {
        if (rawAssets) {
            const newAssets = Object.keys(rawAssets).map((e) => ({
                asset: rawAssets[e].name,
                amount: rawAssets[e].value,
                assetmultiplier: rawAssets[e].multiplier
            }));
            setAssets(newAssets);
        }
    }, [rawAssets]);
    useEffect(() => {
        if (rawLiabilities) {
            const newLiabilities = Object.keys(rawLiabilities).map((e) => ({
                liability: rawLiabilities[e].name,
                amount: rawLiabilities[e].value,
                liabilitymultiplier: rawLiabilities[e].multiplier
            }));
            setLiabilities(newLiabilities);
        }
    }, [rawLiabilities]);



}

export default GetFromDB
