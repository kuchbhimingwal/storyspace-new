
"use client"
interface props {
  label: string;
  placeholder: string;
  onchane: (value:string)=>void,
  type?: string,
  additionalClass?: string
}
function Input({label, placeholder, onchane, type, additionalClass}:props) {
  const handleChange = (e:any)=>{
    onchane(e.target.value)
  }
  return (
    <div className="flex flex-wrap">
      <label className="w-full text-gray font-medium py-3 text-sm font-sans">{label}</label>
      <input className='w-full border border-gray p-2 rounded-xl text-sm font-sans' type={type} placeholder={placeholder} onChange={handleChange}/>

    </div>
  )
}

export default Input