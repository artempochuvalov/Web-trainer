import {createStore} from 'vuex';

import {navMenuModule} from "@/store/navMenuModule";
import {authModule} from "@/store/authModule";
import {profileModule} from '@/store/profileModule';
import { langsModule } from '@/store/langsModule';

import { ospfModule } from '@/store/ospfModule';
import { stpModule } from "@/store/stpModule";
import { ripModule } from '@/store/ripModule';


export default createStore({
    modules: {
        navMenu: navMenuModule,
        auth: authModule,
        profile: profileModule,
        langs: langsModule,

        ospf: ospfModule,
        rip: ripModule,
        stp: stpModule,
    }
});