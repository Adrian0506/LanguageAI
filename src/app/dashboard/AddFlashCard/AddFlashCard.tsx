'use client'
import React from 'react'
import axios from 'axios'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import Input from '../Input/Input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

import '../dimmer.css'

//TODO: better variable naming
export function AddFlashCard({ setShowCreateCard, setFlashCards }) {
    const [inputs, setInputs] = React.useState([[]])
    const [data, setData] = React.useState({})
    const [loading, setLoading] = React.useState(false)

    const { toast } = useToast()

    const onChange = (e) => {
        const currentId = e.target.id
        const value = e.target.value
        if (!data['wordsToStudy']) {
            data['wordsToStudy'] = {}
        }
        if (
            !data['wordsToStudy'][currentId] &&
            !currentId.includes('to translate')
        ) {
            data['wordsToStudy'][currentId] = []
        } else if (
            !data['wordsToStudy'][currentId[0]] &&
            currentId.includes('to translate')
        ) {
            data['wordsToStudy'][currentId[0]] = []
        }

        if (currentId.includes('to translate')) {
            data['wordsToStudy'][currentId[0]][1] = value
        } else {
            data['wordsToStudy'][currentId[0]][0] = value
        }

        setData(data)
    }

    const setTitleName = (e) => {
        const titleName = e.target.value
        setData({ ...data, title: titleName })
        console.log(data, titleName)
    }

    const validateInput = (): boolean => {
        if (!data.title || !data.title.length) {
            return false
        }
        if (!data.wordsToStudy) {
            return false
        }
        for (let key in data.wordsToStudy) {
            console.log(data.wordsToStudy[key], 'logged')
            for (let i = 0; i < data.wordsToStudy[key].length; i++) {
                if (data.wordsToStudy[key].length <= 1) {
                    return false
                }
                if (data.wordsToStudy[key][i] === '') {
                    return false
                }
            }
        }
        return true
    }
    const onCreate = (e) => {
        e.preventDefault()
        //TODO: MAKE API CALL, TOAST DEPENDING ON 200 OR 500
        if (!validateInput()) {
            toast({
                title: `There was a error saving your card. Please fill out the required information`,
                description: `Some inputs are missing`,
                variant: 'destructive',
            })
            return
        }
        axios
            .post('/api/createCard', {
                userKey: window.localStorage.userId,
                data: data,
            })
            .then((cards) => {
                setFlashCards((prev) => [...prev, data])
                console.log(cards, 'from here')
            })
            .catch((err) => err)
        toast({
            title: `Card has been saved`,
            description: `Card has been created: "${data.title}"`,
        })
        setShowCreateCard(false)
    }

    const translateWithDeep = (id) => {
        setLoading(true)
        const textToTranslate = data['wordsToStudy'][id][0]

        const headers = {
            'Content-Type': 'application/json', // You can adjust the Content-Type based on your needs
        }
        axios
            .post('/api/translate', { word: textToTranslate }, { headers })
            .then((wordData) => {
                const translatedWord =
                    wordData.data.requestData.translations[0].text
                const textField = document.getElementById(
                    `${id} - to translate`
                ) as HTMLInputElement
                textField.value = translatedWord
                data['wordsToStudy'][id][1] = translatedWord
                setData(data)
                setLoading(false)
            })
            .catch((err) => {
                console.error(err)
                setLoading(false)
            })
    }
    return (
        <div className="flex center-items dimmer">
            <Card className="fixed z-10 w-2/4 bg-white">
                <CardHeader>
                    <CardTitle>Create a new card</CardTitle>
                    <CardDescription>
                        Add a new flash card to your deck
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid items-center w-full gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Input
                                onChange={setTitleName}
                                placeHolder="Name your flashcard"
                            ></Input>
                            <div className="flex flex-col gap-8">
                                {inputs.map((item, index) => {
                                    return (
                                        <div className="flex flex-row">
                                            <Input
                                                id={index.toString()}
                                                onChange={onChange}
                                                placeHolder="Name of your word"
                                            />
                                            {!loading ? (
                                                <Button
                                                    onClick={() =>
                                                        translateWithDeep(
                                                            index.toString()
                                                        )
                                                    }
                                                    variant="secondary"
                                                >
                                                    Secondary
                                                </Button>
                                            ) : (
                                                <Button disabled>
                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                    Please wait
                                                </Button>
                                            )}
                                            <Input
                                                id={`${index.toString()} - to translate`}
                                                onChange={onChange}
                                                placeHolder="Name of your translated word"
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setInputs([...inputs, []])}
                        className="red-button"
                    >
                        Add a word
                    </button>
                    <CardFooter className="flex justify-between gap-8">
                        <Button
                            onClick={() => setShowCreateCard(false)}
                            variant="outline"
                        >
                            Cancel
                        </Button>
                        <Button onClick={onCreate}>Deploy</Button>
                    </CardFooter>
                </CardContent>
            </Card>
        </div>
    )
}
