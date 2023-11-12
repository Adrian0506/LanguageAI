'use client'
import React from 'react'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

import '../dimmer.css'

//TODO: better variable naming
export function AddFlashCard({ setShowCreateCard, setFlashCards }) {
    const [inputs, setInputs] = React.useState([[]])
    const [data, setData] = React.useState({
        reviewStatus: 'Reviewed',
        id: '123',
    })
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
        console.log(data)
    }

    const setTitleName = (e) => {
        const titleName = e.target.value
        setData({ ...data, title: titleName })
        console.log(data, titleName)
    }

    const onCreate = (e) => {
        e.preventDefault()

        setFlashCards((prev) => {
            return [...prev, data]
        })
        //TODO: MAKE API CALL, TOAST DEPENDING ON 200 OR 500

        toast({
            title: `Card has been saved`,
            description: `Card has been created: "${data.title}"`,
        })
        setShowCreateCard(false)
    }

    const translateWithDeep = (id) => {
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
                )
                textField.value = translatedWord
                data['wordsToStudy'][id][1] = translatedWord
                setData(data)
            })
            .catch((err) => err)
    }
    return (
        <div className="flex center-items dimmer">
            <Card className="fixed z-10 w-3/4 bg-white">
                <CardHeader>
                    <CardTitle>Create a new card</CardTitle>
                    <CardDescription>
                        Add a new flash card to your deck
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid items-center w-full gap-4">
                        <div className="flex flex-col space-y-1.5">
                            Card word
                            <Label htmlFor="name">Word</Label>
                            <Input
                                onChange={setTitleName}
                                placeholder="Name your flashcard"
                            ></Input>
                            <div className="flex flex-col gap-8">
                                {inputs.map((item, index) => {
                                    return (
                                        <div className="flex flex-row">
                                            <Input
                                                id={index.toString()}
                                                onChange={onChange}
                                                placeholder="Name of your word"
                                            />
                                            <button
                                                onClick={() =>
                                                    translateWithDeep(
                                                        index.toString()
                                                    )
                                                }
                                            >
                                                Translate
                                            </button>
                                            <Input
                                                id={`${index.toString()} - to translate`}
                                                onChange={onChange}
                                                placeholder="Name of your translated word"
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setInputs([...inputs, []])}>
                        Add a new word
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
