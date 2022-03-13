<script>
export default {
    props: [
        'skill',
    ]
}
</script>

<template>
    <li>
        <div>
            <input 
                type="text" 
                disabled 
                :min="0" 
                :max="4" 
                v-model="skill.value" 
                class="
                    z-20 opacity-100 text-[17px] py-[.6rem] my-[-5px] font-black 
                    text-blue-dark disabled:text-blue-dark w-12
                    bg-white rounded-full text-center rounded-full
                    focus:outline-none focus:ring-2 focus:ring-blue-dark
                " 
            /> 
        </div>
        <button 
        @click="skill.value--;" :disabled="skill.value < 1" 
        class="
            z-30 text-[16px] font-black bg-blue-dark hover:bg-blue-light transition-colors 
            rounded-full px-[16px] sm:px-[16px] py-[8px] sm:py-[8px] mx-[2px] sm:mx-[2px] mb-[2px] mt-[-12px] text-white 
            focus:ring-2 ring-blue-light disabled:bg-slate-600
        "
        >
            -
        </button>
        <button 
        @click="skill.value++;" :disabled="((skill.value > 3) || remainingPoints <= 0)" 
        class="
            z-30 text-[16px] font-black bg-blue-dark hover:bg-blue-light transition-colors 
            rounded-full px-[16px] sm:px-[16px] py-[8px] sm:py-[8px] mx-[2px] sm:mx-[2px] mb-[2px] mt-[-12px] text-white 
            focus:ring-2 ring-blue-light disabled:bg-slate-600
        "
        >
            +
        </button>
        <textarea
        v-model="skill.name"
        class="
            z-10 text-[16px] w-full text-center break-words resize-none mt-[-2px]
            font-bold text-blue-dark bg-slate-50 rounded leading-5 pt-[1px]" 
        ></textarea>
    </li>
</template>