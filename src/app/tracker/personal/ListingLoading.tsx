import React from 'react';

const ListingLoading: React.FC = () => {
    return (
        <div className="animate-pulse">
            <table className="min-w-full divide-y ">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ...
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ...
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ...
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ...
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="h-4 bg-gray-200 rounded"></div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="h-4 bg-gray-200 rounded"></div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="h-4 bg-gray-200 rounded"></div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="h-4 bg-gray-200 rounded"></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListingLoading;
