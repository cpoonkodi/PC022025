import { CustomCard } from '../components/CustomCard'
import { AddChart } from '../components/AddChart'
import { EditChart } from '../components/EditChart'
import { DisplayChart } from './DisplayChart'
import { useState } from 'react';
import { useSelector } from 'react-redux'
import type { RootState } from '../store'

export const Home  = () => {
	const {chartsList} = useSelector((state: RootState) => state.charts)
	const [modalShow,setModalShow] = useState<boolean>(false)
	// const [modalShow1,setModalShow1] = useState<boolean>(false)

  return (
	<div>
		{chartsList.length === 0 && (
		<CustomCard 
			message="No charts created yet."
			actionLabel="+ Add Chart"
			onActionClick={()=>setModalShow(true)}
		/>)}
		{chartsList.length > 0 && (
		<DisplayChart />
		)}
	<AddChart show={modalShow} onHide={() => setModalShow(false)} />
	{/* <EditChart show={modalShow1} onHide={() => setModalShow1(false)} /> */}
	</div>
  )
}
