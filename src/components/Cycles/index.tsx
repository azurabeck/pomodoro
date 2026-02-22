import { useTaskContext } from '../../contexts/TaskContext/TaskContextHook';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import styles from './styles.module.css'

export function Cycles() {

    const { state } = useTaskContext();
    const cycleStep = Array.from({ length: state.currentCycle})

    const cycleDescriptions = {
        'workTime': 'Tempo de trabalho',
        'shortBreakTime': 'Pausa curta',
        'longBreakTime': 'Pausa longa'
    }

    return (
        <div className={styles.cycles}>
            <span>Ciclos</span>
            <div className={styles.cyclesDots}>
                {
                    cycleStep.map((_, index) => {
                        
                        const nextCycle = getNextCycle(index);
                        const nextCycleType = getNextCycleType(nextCycle);

                        return <span 
                            key={`${nextCycleType}-${nextCycle}`} 
                            className={`${styles.cyclesDot} ${styles[nextCycleType]}`}
                            aria-label={`Indicador de ${cycleDescriptions[nextCycleType]}`}
                            title={`Indicador de ${cycleDescriptions[nextCycleType]}`}
                            ></span>
                    })
                }
            </div>
        </div>
    )
}