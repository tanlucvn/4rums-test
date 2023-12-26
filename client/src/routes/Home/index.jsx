import { useContext, useEffect, useState } from 'react';

import { StoreContext } from 'stores/Store';

import Boards from './Boards';
import Activity from 'components/Layout/__test-Body__/Activity';
import HomeCard from 'components/__test__/HomeCard';

const Home = () => {
    document.title = 'Forum'
    const { setPostType, setFabVisible, lang } = useContext(StoreContext)
    const [init, setInit] = useState(true)

    useEffect(() => {
        if (init) {
            setFabVisible(true)
            setPostType({
                type: 'thread',
                id: null
            })
        }
        setInit(false)
        // eslint-disable-next-line
    }, [init])

    return (
        <>
            {navigator.onLine && <Boards lang={lang} />}
            <Activity />
            <HomeCard />
        </>
    )
}

export default Home;