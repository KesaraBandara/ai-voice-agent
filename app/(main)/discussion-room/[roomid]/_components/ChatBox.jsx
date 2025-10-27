import React from 'react'

function ChatBox({conversation}) {

    const [loading, setLoading] = useState(false);
    const updateSummery = useMutation(api.DiscussionRoom.UpdateSummery)
    const { roomid } = useParams();
      const GenerateFeedbackNotes = async () => {
        setLoading(true);
        try {
            const result = await AIModelToGenerateFeedbackAndNotes(coachingOption, conversation);
            console.log(result.content);

            await updateSummery({
                id: roomid,
                summery: result.content
            })
            setLoading(false);
            toast('Feedback/Notes Saved!')
        }
        catch (e) {
            setLoading(false);
            toast('Internal server error, Try again')

        }

    }

  return (
        <div>
            <div className=' h-[60vh] bg-secondary border rounded-xl flex flex-col  relative p-4 overflow-auto scrollbar-hide'>

           <div>{conversation.map((item,index)=>(
            <div className={`flex ${item.role == 'user' && 'justify-end'}`}>
              {item.role == 'assistant' ?
                <h2 className='p-1 px-2 bg-primary mt-1 text-white inline-block rounded-md'>{item.content}</h2>
                :
                <h2 className='p-1 px-2 bg-gray-200 mt-1 inline-block rounded-md justify-end'>{item?.content}</h2>}
            </div>
        ))}
        </div>
          </div>
            {!enableFeedbackNotes ?
                <h2 className='mt-4 text-gray-400 text-sm'></h2>
                : <Button onClick={GenerateFeedbackNotes} disabled={loading} className='mt-7 w-full'>
                    {loading && <LoaderCircle className='animate-spin' />}
                    Generate Feedback/Notes</Button>}
        </div>
  )
}

export default ChatBox
