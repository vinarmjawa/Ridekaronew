import React from 'react'

const Locationpanel = (props) => {
    const { suggestions, handleSuggestionClick } = props;

    // Limit the number of suggestions to prevent overflow and make it scrollable
    const suggestionsToShow = suggestions ? suggestions.slice(0, 4) : [];


    return (
        <div className='p-4 overflow-y-auto h-full'>
            {suggestionsToShow.length > 0 ? (
                suggestionsToShow.map(function (elm, index) {
                    return (
                        <div 
                            key={index}
                            onClick={() => handleSuggestionClick(elm)}
                            className='flex gap-4 border-2 p-3 border-gray-50 active:border-gray-500 rounded-xl items-center my-2 justify-start cursor-pointer'>
                            <div className='bg-[#eee] h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0'>
                                <i className="ri-map-pin-fill text-xl text-gray-700"></i>
                            </div>
                            <h4 className='font-medium text-gray-800 break-words'>{elm}</h4>
                        </div>
                    )
                })
            ) : (
                <div className='text-center text-gray-500 '>No suggestions found.</div>
            )}
        </div>
    )
}

export default Locationpanel