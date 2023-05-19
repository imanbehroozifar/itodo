import { RiMastodonLine } from "react-icons/ri"
import { BiRightArrow, BiLeftArrow } from "react-icons/bi"
const Tasks = ({ data, next, back , fetchTodos }) => {
    const changeStatus = async (id, status) => {
        const res = await fetch("/api/todos", {
            method: "PATCH",
            body: JSON.stringify({ id:id, status:status }),
            headers: { "Content-Type": "apllication/json" }
        

        })
        const data = await res.json();
        if(data.status === 'success') fetchTodos()
    }
    return (
        <div className="tasks">
            {data?.map(i => (
                <div key={i._id} className="tasks__card">
                    <span className={i.status}></span>
                    <RiMastodonLine />
                    <h4>{i.title}</h4>
                    <div>
                        {
                            back ? (<button onClick={() => changeStatus(i._id, back)} className="button-back"> <BiLeftArrow />Back </button>) : null
                        }
                        {
                            next ? (<button onClick={() => changeStatus(i._id, next)} className="button-next"> Next <BiRightArrow /> </button>) : null
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Tasks