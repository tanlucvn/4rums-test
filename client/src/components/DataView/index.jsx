import Loader from 'components/Loader';
import Errors from 'components/Errors';

const DataView = ({ data, noData, loading, moreLoading, card: Card, noDataMessage, errorMessage, lang, children }) => {
    return !noData ? (
        !loading ? (
            data.length ? (
                <>
                    {children}

                    <div className="items_list">
                        {data.map(item => (
                            <Card key={item._id} data={item} />
                        ))}
                    </div>

                    {moreLoading && <Loader className="more_loader" color="#64707d" />}
                </>
            ) : <Errors message={noDataMessage} />
        ) : <Loader color="#64707d" />
    ) : <Errors message={errorMessage} />
}

export default DataView;