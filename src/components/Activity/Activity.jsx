import PropTypes from 'prop-types';


const Activity = ({ activity }) => {
    return (
        <div className='rounded-xl p-5 border border-colorOne mb-2 text-justify h-[30vh] sm:h-[20vh] overflow-scroll flex flex-col justify-between'>
            <h3 className='text-xl font-bold text-colorOne'>{activity.title}</h3>
            <p className='font-mono text-xs'>{activity.operation} on:<br />{activity.modifiedOn}</p>
        </div>
    );
};


Activity.propTypes = {
    activity: PropTypes.object.isRequired
};


export default Activity;
