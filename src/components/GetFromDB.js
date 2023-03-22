import React, { useState } from 'react'
import { useEffect } from 'react';

function GetFromDB({ token, setPersonalDetails, setGoals, goals, setDependents, setAssets, setLiabilities, setRevenue, setExpenses }) {
    const [rawGoal, setRawGoal] = useState([]);
    const [rawAssets, setRawAssets] = useState([]);
    const [rawLiabilities, setRawLiabilities] = useState([]);
    const [rawDependents, setRawDependents] = useState([]);
    useEffect(() => {
        fetch("http://137.184.16.76:81/api/user/details", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => { setPersonalDetails(data);})
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
                fetch("http://137.184.16.76:81/api/user/dependents", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(data => {
                    setRawDependents(data);
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
    useEffect(() => {
        if (rawDependents) {
            const newDependents = Object.keys(rawDependents).map((e) => ({
                firstnamedependent: rawDependents[e].firstName,
                lastnamedependent: rawDependents[e].lastName,
                agedependent: rawDependents[e].age,
                relationship: rawDependents[e].relationship
            }));
            setDependents(newDependents);
        }
    }, [rawLiabilities]);



}

export default GetFromDB
