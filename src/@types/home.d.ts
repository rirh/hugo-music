export declare namespace Home {
    type asObject = {
        appearance: string
        userinfo: {}
        locales: string
        spreadflower: string
        lyricBgMode: string

    }
    type commentMusicRequest = {
        id: number
        limit: number,
        offset: number,
        before: number
        time?: string
    }
    type lyricRequest = {
        id: number
    }
    type songsDetail = {
        ids: number[]
    }
    type songsRulRequest = {
        id: number,
        br?: number,
    }
    type searchSuggetsRequest = {
        keywords: string
        type: string
    }

    type cloudSearchRequest = {
        keywords: string,
        limit?: number,
        offset?: number,
    }



}