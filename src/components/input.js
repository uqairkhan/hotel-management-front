const Input=({label="",inputProps,padding="p-4",marginBottom="mb-4"}) => {
    return (
        <div className={`${marginBottom}`}>
           {label&& <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>}
            <input {...inputProps} 
            className={`block w-full ${padding} text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300`} />
        </div>
    )
}
export default Input;