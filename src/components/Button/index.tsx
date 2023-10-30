
interface ButtonProps {
    props: string;
}

export const Button = ({props}: ButtonProps) => {
  return (
    <button 
        className="h-9 bg-blue-600 rounded-md border-0 text-lg font-medium text-white mb-2"
        type='submit'
    >
        {props}

    </button>
  )
}
