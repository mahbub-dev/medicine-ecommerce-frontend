import React from 'react';

interface StatusUpdate {
  status: string;
  updatedAt: string;
  _id: string;
}

interface StatusUpdateTimelineProps {
  statusUpdates: StatusUpdate[];
}

const StatusUpdateTimeline: React.FC<StatusUpdateTimelineProps> = ({ statusUpdates }) => {
  return (
    <div className=" mx-auto ">
      <h2 className="text-lg font-bold mb-6">Order Status Timeline</h2>
      <div className="relative flex flex-col items-center">
        {/* Timeline Line */}
        {/* <div className="absolute inset-y-0 left-1/2 w-full max-w-screen-lg flex items-center">
          <div className="w-full h-1 bg-gray-300" />
        </div> */}

        {/* Timeline Items */}
        <div className="flex flex-col overflow-x-auto  gap-2">
          {statusUpdates.map((update, index) => (
            <div key={update._id} className="flex-shrink-0 relative flex items-center">
              {/* Status Circle */}
              <div className="relative w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center">
                <span className="text-xs font-semibold">{index + 1}</span>
              </div>
              <div className="ml-4">
                {/* Status Content */}
                <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-sm max-w-xs">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {update.status.charAt(0).toUpperCase() + update.status.slice(1)}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                  At {new Date(update.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusUpdateTimeline;
