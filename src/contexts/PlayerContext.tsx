import {createContext,useState,ReactNode,useContext} from 'react';


type Episode = {
    title:string;
    members:string;
    thumbnail: string;
    duration:number;
    url:string;
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex:number;
    play: (episode:Episode) => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    clearPlayerState: () => void;
    setPlayingState: (state:boolean) =>void;
    playList: (list:Episode[],index:number) => void;
    playPrevius: () => void;
    playNext: () =>void;
    isPlaying:boolean; 
    isLooping:boolean; 
    isShuffling:boolean;
    hasPrevius:boolean; 
    hasNext:boolean; 
         
};

type PlayerContextProviderProps = {
    children:ReactNode
} 

export const PlayerContext = createContext({} as PlayerContextData);


export function PlayerContextProvider({children} : PlayerContextProviderProps){

    type PlayerContextProviderProps = {
        children:ReactNode
    }

    const [episodeList,setEpisodeList] = useState([]);
    const [currentEpisodeIndex,setCurrentEpisodeIndex] = useState(0);
    const [isPlaying,setIsPlaying] = useState(false);
    const [isLooping,setIsLooping] = useState(false);
    const [isShuffling,setIsShuffling] = useState(false);
  
    function play (episode:Episode){
  
      setEpisodeList([episode]);
      setCurrentEpisodeIndex(0);
      setIsPlaying(true);
  
    }

    function playNext (){

        if(isShuffling){
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
            setCurrentEpisodeIndex(nextRandomEpisodeIndex);
        } else {

            const nextEpisodeIndex = currentEpisodeIndex + 1;
            if(nextEpisodeIndex >= episodeList.length){
                return;
            }
            setCurrentEpisodeIndex(currentEpisodeIndex  +1); 

        }
  
      
      }

      const hasPrevius = currentEpisodeIndex > 0;
      const hasNext = isShuffling || (currentEpisodeIndex + 1 ) < episodeList.length;

      function clearPlayerState(){
          setEpisodeList([]);
          setCurrentEpisodeIndex(0);
      }

      function playPrevius (){

        if(hasPrevius){
            setCurrentEpisodeIndex(currentEpisodeIndex -1); 
        }
        
      }

    function playList(list: Episode[], index:number){
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }
  
    function togglePlay (){
      setIsPlaying(!isPlaying);
    }

    function toggleLoop (){
        setIsLooping(!isLooping);
      }

      
    function toggleShuffle (){
        setIsShuffling(!isShuffling);
      }
  
    function setPlayingState(state:boolean){
      setIsPlaying(state)
  
    }
    
    return (
      <PlayerContext.Provider 
           value={{
                episodeList,
                currentEpisodeIndex,
                play,
                isPlaying,
                togglePlay,
                setPlayingState,
                playList,
                playPrevius,
                playNext,
                hasPrevius,
                hasNext,
                toggleLoop,
                isLooping,
                isShuffling,
                toggleShuffle,
                clearPlayerState
            }}>
          {children}
      </PlayerContext.Provider>
    )
  
}

export const usePlayer = () => {
 return useContext(PlayerContext);
}